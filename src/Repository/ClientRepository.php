<?php

namespace App\Repository;

use App\Entity\Client;
use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Client>
 */
class ClientRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Client::class);
    }

    /**
     * Trouve les clients d'un utilisateur
     */
    public function findByUser(Users $user): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.user = :user')
            ->setParameter('user', $user)
            ->orderBy('c.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Compte les clients d'un utilisateur
     */
    public function countByUser(Users $user): int
    {
        return (int) $this->createQueryBuilder('c')
            ->select('COUNT(c.id)')
            ->andWhere('c.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getSingleScalarResult();
    }

    /**
     * Recherche de clients par nom ou entreprise
     */
    public function searchByNameOrCompany(Users $user, string $search): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.user = :user')
            ->andWhere('c.name LIKE :search OR c.company LIKE :search')
            ->setParameter('user', $user)
            ->setParameter('search', '%' . $search . '%')
            ->orderBy('c.name', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
