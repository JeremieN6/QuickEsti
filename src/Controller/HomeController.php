<?php

namespace App\Controller;

use App\Repository\PlanRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(PlanRepository $planRepository): Response
    {
        $plans = $planRepository->findAll();
        return $this->render('home/index.html.twig', [
            'page_title' => 'QuickEsti - Estimations de projets web avec IA',
            'meta_description' => 'Créez des devis professionnels en quelques clics avec notre IA. Adapté aux freelances et entreprises.',
            'plans' => $plans,
        ]);
    }

    #[Route('/estimation', name: 'app_estimation')]
    public function estimation(): Response
    {
        $connectedUser = $this->getUser();
        if($connectedUser)
        {
            return $this->redirectToRoute('app_home');
        }
        return $this->render('estimation/index.html.twig', [
            'page_title' => 'Estimation de projet - QuickEsti',
            'meta_description' => 'Utilisez notre outil d\'estimation intelligent pour créer votre devis personnalisé.',
        ]);
    }

    #[Route('/estimation-v2', name: 'app_estimation_v2')]
    public function estimationV2(): Response
    {
        return $this->render('estimation/v2.html.twig', [
            'page_title' => 'Estimation de projet V2 - QuickEsti',
            'meta_description' => 'Nouvelle version de notre outil d\'estimation avec interface guidée par étapes.',
        ]);
    }

    #[Route('/main', name: 'app_main')]
    public function main(): Response
    {
        return $this->render('main/dashboard.html.twig', [
            'page_title' => 'Tableau de bord - QuickEsti',
        ]);
    }
}
