<?php

namespace ET\PlatformBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * BusinessProduct
 *
 * @ORM\Table(name="products_price")
 * @ORM\Entity(repositoryClass="ET\PlatformBundle\Repository\ProductsPriceRepository")
 */
class ProductsPrice
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
     * @ORM\ManyToOne(targetEntity="ET\PlatformBundle\Entity\Products")
     * @ORM\JoinColumn(nullable=false)
     */
    private $product;

    /**
     * @var int
     *
     * @ORM\Column(name="price", type="integer")
     */
    private $price;

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
     * @param Products $product
     * @return $this
     */
    public function setProduct(Products $product)
    {
        $this->product = $product;

        return $this;
    }

    /**
     * Get product
     *
     * @return Products
     */
    public function getProduct()
    {
        return $this->product;
    }

    /**
     * @param $price
     *
     * @return $this
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return int
     */
    public function getPrice()
    {
        return $this->price;
    }
}

