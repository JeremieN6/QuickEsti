<?php

namespace App\Repository;

use App\Entity\Subscription;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Users;

/**
 * @extends ServiceEntityRepository<Subscription>
 */
class SubscriptionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Subscription::class);
    }

public function save(Subscription $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);


        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }


    public function remove(Subscription $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);


        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }


    public function findActualSub($user)
    {
        $qb = $this
            ->createQueryBuilder('subscription')


            ->where('subscription.currentPeriodStart < :now')
            ->andWhere('subscription.currentPeriodEnd > :now')
            ->setParameter('now', new \Datetime('now'))


            ->andWhere('subscription.user = :user')
            ->setParameter('user', $user)


            ->leftJoin('subscription.plan', 'plan')
            ->addSelect('plan')


            ->orderBy('subscription.currentPeriodEnd', 'desc')
            ->setMaxResults(1)


            ->getQuery()
        ;


        return $qb->getOneOrNullResult();
    }


    public function findActiveSub($user)
    {
        $qb = $this
            ->createQueryBuilder('subscription')


            ->where('subscription.currentPeriodStart < :now')
            ->andWhere('subscription.currentPeriodEnd > :now')
            ->setParameter('now', new \Datetime('now'))


            ->andWhere('subscription.user = :user')
            ->setParameter('user', $user)


            ->andWhere('subscription.isActive = :true')
            ->setParameter('true', true)


            ->leftJoin('subscription.plan', 'plan')
            ->addSelect('plan')


            ->orderBy('subscription.currentPeriodEnd', 'desc')
            ->setMaxResults(1)


            ->getQuery()
        ;


        return $qb->getOneOrNullResult();
    }


    public function findInactiveSub($user)
    {
        $qb = $this
            ->createQueryBuilder('subscription')


            ->where('subscription.currentPeriodStart < :now')
            ->andWhere('subscription.currentPeriodEnd > :now')
            ->setParameter('now', new \Datetime('now'))


            ->andWhere('subscription.user = :user')
            ->setParameter('user', $user)


            ->orderBy('subscription.currentPeriodEnd', 'desc')
            ->setMaxResults(1)


            ->getQuery()
        ;


        return $qb->getOneOrNullResult();
    }


    public function hasActiveSubscription(Users $user)
    {
        $currentDate = new \DateTime(); // Obtenez la date actuelle


        return $this->createQueryBuilder('s')
            ->where('s.user = :user') // Filtrez les abonnements de cet utilisateur
            ->andWhere('s.currentPeriodStart <= :currentDate') // Vérifiez si la période de début est antérieure à la date actuelle
            ->andWhere('s.currentPeriodEnd >= :currentDate') // Vérifiez si la période de fin est postérieure à la date actuelle
            ->setParameter('user', $user)
            ->setParameter('currentDate', $currentDate)
            ->getQuery()
            ->getResult();
    }


//    /**
//     * @return Subscription[] Returns an array of Subscription objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Subscription
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
