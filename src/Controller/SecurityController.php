<?php

namespace App\Controller;

use App\Entity\Users;
use App\Form\ResetPasswordRequestFormType;
use App\Form\ResetPasswordFormType;
use App\Repository\UsersRepository;
use App\Service\SendMailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    #[Route(path: '/reinitialisation-password', name: 'forgetten_password')]
    public function forgetten_password(
        Request $request,
        UsersRepository $usersRepository,
        TokenGeneratorInterface $tokenGenerator,
        SendMailService $mail,
        EntityManagerInterface $em): Response
    {
        $form = $this->createForm(ResetPasswordRequestFormType::class);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid())
        {
            //On va chercher l'utilisateur par son email
            $user = $usersRepository->findOneByEmail($form->get('email')->getData());

            //On vérifie si on a un utilisateur avec cet email
            if($user)
            {
                //On va générer un token de réinitialisation
                $token = $tokenGenerator->generateToken();
                $user->setResetToken($token);
                $em->persist($user);
                $em->flush();

                //On génère un lien de réinitialisation du mot de passe
                $url = $this->generateUrl('reset_pass', ['token' =>$token], UrlGeneratorInterface::ABSOLUTE_URL);

                //On crée les données du mail
                $context = compact('url', 'user');

                //Envoie du mail
                $mail->send(
                    'no-reply@quickesti.fr',
                    $user->getEmail(),
                    'Réinitialisation de Mot de Passe',
                    'password_reset',
                    $context
                );

                $this->addFlash('success', 'Email envoyé avec succès ✅ !');
                return $this->redirectToRoute('app_login');
            }
            //$user est null
            $this->addFlash('error', 'Un problème est survenu ⛔ !');
            return $this->redirectToRoute('app_login');
        }

        return $this->render('security/reset_password_request.html.twig', [
            'requestPassForm' => $form->createView()
        ]);
    }

    #[Route('reinitialisation-password/{token}', name:'reset_pass')]
    public function resetPass(
        string $token,
        Request $request,
        UsersRepository $usersRepository,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher,
    ): Response
    {
        //On vérifie si on a ce token dans la base de donnée
        $user = $usersRepository->findOneByResetToken($token);

        if($user){
            $form = $this->createForm(ResetPasswordFormType::class);

            $form->handleRequest($request);

            if($form->isSubmitted() && $form->isValid()){
                //On efface le token
                $user->setResetToken('');
                $user->setPassword(
                    $passwordHasher->hashPassword($user, $form->get('password')->getData()
                    )
                );
                $em->persist($user);
                $em->flush();

                $this->addFlash('success', 'Ton mot de passe à été réinitialisé avec succès ✅. Test le !');
                return $this->redirectToRoute('app_login');
            }

            return $this->render('security/reset_password.html.twig', [
                'passForm' => $form->createView()
            ]);
        }
        $this->addFlash('error', 'Jeton non valide ⛔ !');
        return $this->redirectToRoute('app_login');
    }
}
