<?php

namespace App\Repository;

use App\Entity\Quote;
use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Quote>
 */
class QuoteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Quote::class);
    }

    /**
     * Trouve les devis d'un utilisateur
     */
    public function findByUser(Users $user): array
    {
        return $this->createQueryBuilder('q')
            ->andWhere('q.user = :user')
            ->setParameter('user', $user)
            ->orderBy('q.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Génère le prochain numéro de devis
     */
    public function generateNextQuoteNumber(): string
    {
        $year = date('Y');
        $prefix = "DE-{$year}-";
        
        $lastQuote = $this->createQueryBuilder('q')
            ->andWhere('q.quoteNumber LIKE :prefix')
            ->setParameter('prefix', $prefix . '%')
            ->orderBy('q.quoteNumber', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

        if ($lastQuote) {
            $lastNumber = (int) substr($lastQuote->getQuoteNumber(), -4);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        return $prefix . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Trouve les devis expirés
     */
    public function findExpired(): array
    {
        return $this->createQueryBuilder('q')
            ->andWhere('q.expiresAt < :now')
            ->andWhere('q.status = :status')
            ->setParameter('now', new \DateTimeImmutable())
            ->setParameter('status', Quote::STATUS_SENT)
            ->getQuery()
            ->getResult();
    }

    /**
     * Statistiques des devis par utilisateur
     */
    public function getStatsByUser(Users $user): array
    {
        $qb = $this->createQueryBuilder('q')
            ->select('q.status, COUNT(q.id) as count, SUM(q.totalTtc) as total')
            ->andWhere('q.user = :user')
            ->setParameter('user', $user)
            ->groupBy('q.status');

        return $qb->getQuery()->getResult();
    }
}
