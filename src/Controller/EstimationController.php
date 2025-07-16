<?php

namespace App\Controller;

use App\Service\EstimationCalculatorService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Psr\Log\LoggerInterface;

class EstimationController extends AbstractController
{
    public function __construct(
        private EstimationCalculatorService $estimationCalculator,
        private LoggerInterface $logger
    ) {}

    #[Route('/api/estimation', name: 'api_estimation', methods: ['POST'])]
    public function generateEstimation(Request $request): JsonResponse
    {
        try {
            // Récupération et validation des données
            $data = json_decode($request->getContent(), true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                return $this->json([
                    'success' => false,
                    'error' => 'Données JSON invalides'
                ], 400);
            }

            // Validation des champs requis
            if (!isset($data['userType']) || !isset($data['formData'])) {
                return $this->json([
                    'success' => false,
                    'error' => 'Champs requis manquants (userType, formData)'
                ], 400);
            }

            $userType = $data['userType'];
            $formData = $data['formData'];

            $this->logger->info('Demande d\'estimation reçue', [
                'userType' => $userType,
                'ip' => $request->getClientIp(),
                'userAgent' => $request->headers->get('User-Agent')
            ]);

            // Génération de l'estimation
            $estimation = $this->estimationCalculator->generateEstimation($formData, $userType);

            // Log du succès
            $this->logger->info('Estimation générée avec succès', [
                'userType' => $userType,
                'totalDays' => $estimation['estimation']['totalDays'],
                'totalCost' => $estimation['estimation']['totalCost']
            ]);

            return $this->json([
                'success' => true,
                'data' => $estimation
            ]);

        } catch (\InvalidArgumentException $e) {
            $this->logger->warning('Erreur validation estimation', [
                'error' => $e->getMessage(),
                'data' => $data ?? null
            ]);

            return $this->json([
                'success' => false,
                'error' => 'Données invalides: ' . $e->getMessage()
            ], 400);

        } catch (\Exception $e) {
            $this->logger->error('Erreur serveur estimation', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return $this->json([
                'success' => false,
                'error' => 'Erreur interne du serveur'
            ], 500);
        }
    }

    #[Route('/api/estimation/test', name: 'api_estimation_test', methods: ['GET'])]
    public function testEstimation(): JsonResponse
    {
        // Données de test pour vérifier que l'API fonctionne
        $testData = [
            'userType' => 'freelance',
            'formData' => [
                'basics' => [
                    'projectType' => 'site-vitrine',
                    'technologies' => 'Vue.js, PHP',
                    'description' => 'Site vitrine pour une entreprise'
                ],
                'constraints' => [
                    'isFullTime' => true,
                    'hasTjmTarget' => true,
                    'tjmTarget' => 500,
                    'securityMargin' => 20
                ],
                'features' => [
                    'selectedFeatures' => ['responsive', 'cms']
                ],
                'objectives' => [
                    'selectedObjectives' => ['profitability']
                ]
            ]
        ];

        try {
            $estimation = $this->estimationCalculator->generateEstimation(
                $testData['formData'], 
                $testData['userType']
            );

            return $this->json([
                'success' => true,
                'message' => 'Test API réussi',
                'testData' => $testData,
                'estimation' => $estimation
            ]);

        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'error' => 'Test échoué: ' . $e->getMessage()
            ], 500);
        }
    }

    #[Route('/api/estimation/health', name: 'api_estimation_health', methods: ['GET'])]
    public function healthCheck(): JsonResponse
    {
        return $this->json([
            'status' => 'ok',
            'service' => 'estimation-api',
            'timestamp' => date('c'),
            'version' => '1.0'
        ]);
    }
}
