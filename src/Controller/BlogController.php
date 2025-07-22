<?php

namespace App\Controller;

use App\Repository\BlogRepository;
use App\Service\OpenAIService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class BlogController extends AbstractController
{
    #[Route('/blog/generate/openai', name: 'app_blog_generate_openai')]
    public function generateWithOpenAI(
        OpenAIService $openAIService,
        BlogRepository $blogRepository,
        \Doctrine\ORM\EntityManagerInterface $em
    ): Response {
        // Exemple de prompt SEO pour un article de blog
        $prompt = "Rédige un article de blog SEO sur le thème : 'L'importance de l'estimation précise dans les projets web en 2025'. Structure l'article en JSON avec les clés : titre, slug (génère un slug SEO à partir du titre), contenu (corps principal, formaté en HTML), auteur (utilise 'Jérémie N.'), createdAt (date du jour, format YYYY-MM-DD). Le contenu doit être informatif, structuré (titres H2/H3), et optimisé pour le SEO. Réponds uniquement avec un JSON strictement valide.";

        $result = $openAIService->callOpenAI($prompt);

        // Validation et fallback minimal
        if (!isset($result['titre'], $result['slug'], $result['contenu'])) {
            throw new \Exception('Réponse OpenAI incomplète.');
        }

        $article = new \App\Entity\Blog();
        $article->setTitre($result['titre']);
        $article->setSlug($result['slug']);
        $article->setContenu($result['contenu']);
        $article->setAuteur($result['auteur'] ?? 'Jérémie N.');
        $article->setCreatedAt(new \DateTimeImmutable($result['createdAt'] ?? date('Y-m-d')));
        $article->setUpdatedAt(new \DateTimeImmutable());

        $em->persist($article);
        $em->flush();

        return $this->redirectToRoute('app_blog_post', ['slug' => $article->getSlug()]);
    }
    #[Route('/blog', name: 'app_blog')]
    public function index(BlogRepository $blogRepository): Response
    {
        // Ici, vous pourriez récupérer les articles depuis la base de données
        $articles = $blogRepository->findAll();

        //Pour récupérer le début d'un article, vous pouvez utiliser une méthode comme substr() ou une fonction personnalisée
        foreach ($articles as $article) {
            $article->intro = substr($article->getContenu(), 0, 150) . '...'; // Limite à 150 caractères
        }
        
        return $this->render('blog/index.html.twig', [
            'controller_name' => 'BlogController',
            'page_title' => 'Le Blog - QuickEsti',
            'articles' => $articles,
        ]);
    }
    #[Route('/blog/{slug}', name: 'app_blog_post')]
    public function post(string $slug, BlogRepository $blogRepository): Response
    {
        $article = $blogRepository->findOneBySlug($slug);
        if (!$article) {
            throw $this->createNotFoundException('Article non trouvé');
        }
        return $this->render('blog/post.html.twig', [
            'article' => $article,
            'slug' => $slug,
            'controller_name' => 'BlogController',
            'page_title' => 'Article - ' . $article->getTitre(),
        ]);
    }
}
