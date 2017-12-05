<?php

namespace ET\PlatformBundle\Service;


use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
use ET\PlatformBundle\Entity\Business;
use ET\PlatformBundle\Entity\BusinessProduct;
use ET\PlatformBundle\Entity\ProductDetail;
use ET\PlatformBundle\Entity\ProductOrder;
use ET\PlatformBundle\Entity\Product;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ETBusinessManager
{
    private $em;
    private $user;

    public function __construct(\Doctrine\ORM\EntityManager $em, TokenStorageInterface $tokenStorage)
    {
        $this->em = $em;
        $this->user = $tokenStorage->getToken()->getUser();
    }


    /**
     * @param $name
     * @return Business
     */
    public function addBusiness($name)
    {
        $business = new Business();
        $business->setName($name);
        $this->em->persist($business);
        $this->em->flush();
        return $business;
    }

    /**
     *
     * Add a business at an user
     *
     * @param $id_user
     * @param $id_business
     * @return bool
     */
    public function addUserToBusiness($id_user, $id_business)
    {
        $repoBusiness = $this->em->getRepository('ETPlatformBundle:Business');
        $repoUser = $this->em->getRepository('ETPlatformBundle:User');
        $business = $repoBusiness->find($id_business);
        $user = $repoUser->find($id_user);
        $user->addBusiness($business);
        $this->em->persist($user);
        $this->em->flush();

        return true;
    }

    public function getUsersNotBusiness($id_business)
    {
        $business = $this->em->getRepository('ETPlatformBundle:Business')->find($id_business);
        $users_tmp = $this->em->getRepository('ETPlatformBundle:User')->findAll();
        $users = [];
        foreach ($users_tmp as $user)
        {
            if (!$user->hasBusiness($business))
                $users[] = $user;
        }
        return $users;
    }
}