<?php

namespace ET\PlatformBundle\Service;


use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
use ET\PlatformBundle\Entity\Business;
use ET\PlatformBundle\Entity\BusinessProduct;
use ET\PlatformBundle\Entity\ProductDetail;
use ET\PlatformBundle\Entity\ProductOrder;
use ET\PlatformBundle\Entity\Product;
use Symfony\Component\HttpKernel\Exception\HttpException;
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
     * @param Business[] $business
     * @return array
     */
    public function getClassifiedStatusBusiness($business)
    {
        $business_on = array();
        $business_off = array();
        foreach ($business as $busi)
        {
            ($busi->getStatus()) ? $business_on[] = $busi : $business_off[] = $busi;
        }
        return array_merge($business_on, $business_off);
    }

    /**
     * Return users in te business (if is_business) or not in (if !is_business)
     * @param $id_business
     * @param $is_business
     * @return array
     */
    public function getUsersBusiness($id_business, $is_business)
    {
        $business = $this->em->getRepository('ETPlatformBundle:Business')->find($id_business);
        $users_tmp = $this->em->getRepository('ETPlatformBundle:User')->findAll();
        $users = [];
        foreach ($users_tmp as $user)
        {
            if ((!$is_business && !$user->hasBusiness($business) && !$user->hasRole('ROLE_ADMIN')) || ($is_business && ($user->hasBusiness($business) || $user->hasRole('ROLE_ADMIN'))))
                $users[] = $user;
        }
        return $users;
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
        $this->addUserToBusiness($this->user->getId(), $business->getId());
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

    /**
     *
     * Change status of a business
     *
     * @param $id_business
     * @return bool
     * @internal param $id_user
     */
    public function changeStatus($id_business)
    {
        $repoBusiness = $this->em->getRepository('ETPlatformBundle:Business');
        $business = $repoBusiness->find($id_business);
        $business->setStatus(!$business->getStatus());
        $this->em->persist($business);
        $this->em->flush();

        return true;
    }

    public function deleteUserFromBusiness($id_user, $id_business) {

        $user = $this->em->getRepository('ETPlatformBundle:User')
            ->find($id_user);

        $business = $this->em->getRepository('ETPlatformBundle:Business')
            ->find($id_business);


        if ($user->hasRole('ROLE_ADMIN'))
            throw new HttpException(500,
                'Vous ne pouvez pas supprimer cet utilisateur.'
            );
        $user->removeBusiness($business);
        $this->em->persist($user);
        $this->em->flush();
        return true;
    }
}