<?php

namespace ET\PlatformBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * BusinessProduct
 *
 * @ORM\Table(name="business_product")
 * @ORM\Entity(repositoryClass="ET\PlatformBundle\Repository\BusinessProductRepository")
 */
class BusinessProduct
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="ET\PlatformBundle\Entity\Business")
     * @ORM\JoinColumn(nullable=false)
     */

    private $business;

    /**
     * @ORM\ManyToOne(targetEntity="ET\PlatformBundle\Entity\ProductsPrice")
     * @ORM\JoinColumn(nullable=false)
     */
    private $productPrice;

    /**
     * @ORM\ManyToOne(targetEntity="ET\PlatformBundle\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @var int
     *
     * @ORM\Column(name="quantity", type="integer")
     */
    private $quantity;

    /**
     * @var int
     *
     * @ORM\Column(name="creationDate", type="datetime")
     */
    private $creationDate;

    public function __construct()
    {
        // Par défaut, la date de l'annonce est la date d'aujourd'hui
        $this->creationDate = new \Datetime();
    }

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set business
     *
     * @param Business $business
     *
     * @return BusinessProduct
     */
    public function setBusiness(Business $business)
    {
        $this->business = $business;

        return $this;
    }

    /**
     * Get business
     *
     * @return Business
     */
    public function getBusiness()
    {
        return $this->business;
    }

    /**
     * @return mixed
     */
    public function getProductPrice()
    {
        return $this->productPrice;
    }

    /**
     * @param mixed $productPrice
     */
    public function setProductPrice($productPrice)
    {
        $this->productPrice = $productPrice;
    }

    /**
     * @param $quantity
     * @return $this
     */
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;
    }

    /**
     * @return int
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * Set creationDate
     *
     * @param \DateTime $creationDate
     *
     * @return BusinessProduct
     */
    public function setCreationDate($creationDate)
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    /**
     * Get creationDate
     *
     * @return \DateTime
     */
    public function getCreationDate()
    {
        return $this->creationDate;
    }


    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }
}

