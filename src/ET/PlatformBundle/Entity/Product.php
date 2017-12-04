<?php

namespace ET\PlatformBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * BusinessProduct
 *
 * @ORM\Table(name="product")
 * @ORM\Entity(repositoryClass="ET\PlatformBundle\Repository\ProductRepository")
 */
class Product
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
     * @ORM\ManyToOne(targetEntity="ET\PlatformBundle\Entity\ProductDetail")
     * @ORM\JoinColumn(nullable=false)
     */
    private $product_detail;

    /**
     * @var int
     *
     * @ORM\Column(name="price", type="integer")
     */
    private $price;

    /**
     * @var int
     *
     * @ORM\Column(name="quantity_real", type="integer")
     */
    private $quantity_real;

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

    /**
     * @return mixed
     */
    public function getProductDetail()
    {
        return $this->product_detail;
    }

    /**
     * @param mixed $product_detail
     */
    public function setProductDetail($product_detail)
    {
        $this->product_detail = $product_detail;
    }

    /**
     * @return int
     */
    public function getQuantityReal()
    {
        return $this->quantity_real;
    }

    /**
     * @param int $quantity_real
     */
    public function setQuantityReal($quantity_real)
    {
        $this->quantity_real = $quantity_real;
    }
}

