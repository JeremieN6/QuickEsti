<?php

namespace App\Controller\Admin;

use App\Entity\Invoice;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;

class InvoiceCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Invoice::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('stripeId', 'ID Stripe'),
            TextField::new('number', 'Numéro de facture'),
            AssociationField::new('subscription', 'Abonnement'),
            MoneyField::new('amountPaid', 'Montant payé')->setCurrency('EUR')->setStoredAsCents(),
            TextField::new('hostedInvoiceUrl', 'URL de la facture'),
            DateTimeField::new('createdAt', 'Créé le')->hideOnForm(),
        ];
    }
}
