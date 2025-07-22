<?php

namespace App\Controller\Admin;

use App\Entity\Plan;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;

class PlanCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Plan::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('name', 'Nom du plan'),
            TextEditorField::new('description', 'Description'),
            MoneyField::new('price', 'Prix')->setCurrency('EUR'),
            IntegerField::new('duration', 'Durée (jours)'),
            BooleanField::new('isActive', 'Actif'),
        ];
    }
}
