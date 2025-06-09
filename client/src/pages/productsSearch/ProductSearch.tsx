import React, { useState, useEffect } from "react";
import "./productSearch.scss";
import Navbar from "../../components/navbar/Navbar";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  brand: string;
  category: string;
  color: string;
  size: string[];
  material: string;
  inStock: boolean;
}

interface FilterState {
  searchQuery: string;
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  materials: string[];
  rating: number;
  inStock: boolean;
  onSale: boolean;
}

const ProductSearchPage: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 99.99,
      originalPrice: 149.99,
      image: "/api/placeholder/300/300",
      rating: 4.5,
      reviews: 128,
      badge: "Sale",
      brand: "TechSound",
      category: "Electronics",
      color: "Black",
      size: ["One Size"],
      material: "Plastic",
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      image: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 89,
      badge: "New",
      brand: "FitTech",
      category: "Electronics",
      color: "Silver",
      size: ["S", "M", "L"],
      material: "Metal",
      inStock: true,
    },
    {
      id: 3,
      name: "Premium Laptop Backpack",
      price: 49.99,
      originalPrice: 79.99,
      image: "/api/placeholder/300/300",
      rating: 4.3,
      reviews: 156,
      brand: "TravelPro",
      category: "Bags",
      color: "Navy",
      size: ["One Size"],
      material: "Nylon",
      inStock: true,
    },
    {
      id: 4,
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      image: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 203,
      badge: "Popular",
      brand: "SoundWave",
      category: "Electronics",
      color: "Red",
      size: ["One Size"],
      material: "Fabric",
      inStock: true,
    },
    {
      id: 5,
      name: "Gaming Mechanical Keyboard",
      price: 129.99,
      originalPrice: 179.99,
      image: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 94,
      badge: "Sale",
      brand: "GamePro",
      category: "Electronics",
      color: "Black",
      size: ["One Size"],
      material: "Metal",
      inStock: false,
    },
    {
      id: 6,
      name: "USB-C Multi-Port Hub",
      price: 39.99,
      image: "/api/placeholder/300/300",
      rating: 4.4,
      reviews: 67,
      brand: "ConnectTech",
      category: "Electronics",
      color: "Gray",
      size: ["One Size"],
      material: "Aluminum",
      inStock: true,
    },
    {
      id: 7,
      name: "Cotton T-Shirt",
      price: 24.99,
      image: "/api/placeholder/300/300",
      rating: 4.2,
      reviews: 245,
      brand: "ComfortWear",
      category: "Clothing",
      color: "White",
      size: ["XS", "S", "M", "L", "XL"],
      material: "Cotton",
      inStock: true,
    },
    {
      id: 8,
      name: "Running Shoes",
      price: 89.99,
      originalPrice: 119.99,
      image: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 178,
      badge: "Sale",
      brand: "SportFlex",
      category: "Footwear",
      color: "Blue",
      size: ["7", "8", "9", "10", "11"],
      material: "Synthetic",
      inStock: true,
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    categories: [],
    brands: [],
    priceRange: [0, 500],
    colors: [],
    sizes: [],
    materials: [],
    rating: 0,
    inStock: false,
    onSale: false,
  });

  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [resultsCount, setResultsCount] = useState(products.length);

  // Extract unique filter options from products
  const filterOptions = {
    categories: [...new Set(products.map((p) => p.category))],
    brands: [...new Set(products.map((p) => p.brand))],
    colors: [...new Set(products.map((p) => p.color))],
    sizes: [...new Set(products.flatMap((p) => p.size))],
    materials: [...new Set(products.map((p) => p.material))],
  };

  // Apply filters
  useEffect(() => {
    const filtered = products.filter((product) => {
      // Search query
      if (
        filters.searchQuery &&
        !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Categories
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }

      // Brands
      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      ) {
        return false;
      }

      // Price range
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Colors
      if (
        filters.colors.length > 0 &&
        !filters.colors.includes(product.color)
      ) {
        return false;
      }

      // Sizes
      if (
        filters.sizes.length > 0 &&
        !product.size.some((size) => filters.sizes.includes(size))
      ) {
        return false;
      }

      // Materials
      if (
        filters.materials.length > 0 &&
        !filters.materials.includes(product.material)
      ) {
        return false;
      }

      // Rating
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // In stock
      if (filters.inStock && !product.inStock) {
        return false;
      }

      // On sale
      if (filters.onSale && !product.originalPrice) {
        return false;
      }

      return true;
    });

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredProducts(filtered);
    setResultsCount(filtered.length);
  }, [filters, sortBy, products]);

  const handleFilterChange = (
    filterType: keyof FilterState,
    value: unknown
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleMultiSelectFilter = (
    filterType: "categories" | "brands" | "colors" | "sizes" | "materials",
    value: string
  ) => {
    setFilters((prev) => {
      const currentValues = prev[filterType] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [filterType]: newValues,
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      searchQuery: "",
      categories: [],
      brands: [],
      priceRange: [0, 500],
      colors: [],
      sizes: [],
      materials: [],
      rating: 0,
      inStock: false,
      onSale: false,
    });
  };

  const removeFilter = (filterType: keyof FilterState, value?: string) => {
    if (value && Array.isArray(filters[filterType])) {
      const currentValues = filters[filterType] as string[];
      setFilters((prev) => ({
        ...prev,
        [filterType]: currentValues.filter((v) => v !== value),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]:
          filterType === "priceRange"
            ? [0, 500]
            : filterType === "rating"
            ? 0
            : false,
      }));
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`star ${i < Math.floor(rating) ? "filled" : ""}`}
      >
        ⭐
      </span>
    ));
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchQuery) count++;
    count += filters.categories.length;
    count += filters.brands.length;
    count += filters.colors.length;
    count += filters.sizes.length;
    count += filters.materials.length;
    if (filters.rating > 0) count++;
    if (filters.inStock) count++;
    if (filters.onSale) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) count++;
    return count;
  };

  return (
    <div className="product-search-page">
      <Navbar />
      {/* Search Header */}
      <div className="search-header">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.searchQuery}
              onChange={(e) =>
                handleFilterChange("searchQuery", e.target.value)
              }
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="search-content">
          {/* Sidebar Filters */}
          <aside className={`filters-sidebar ${showFilters ? "open" : ""}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="clear-filters" onClick={clearAllFilters}>
                Clear All ({getActiveFiltersCount()})
              </button>
            </div>

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
              <div className="active-filters">
                <h4>Active Filters:</h4>
                <div className="filter-tags">
                  {filters.searchQuery && (
                    <span className="filter-tag">
                      Search: {filters.searchQuery}
                      <button
                        onClick={() => handleFilterChange("searchQuery", "")}
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.categories.map((cat) => (
                    <span key={cat} className="filter-tag">
                      {cat}
                      <button onClick={() => removeFilter("categories", cat)}>
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.brands.map((brand) => (
                    <span key={brand} className="filter-tag">
                      {brand}
                      <button onClick={() => removeFilter("brands", brand)}>
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.colors.map((color) => (
                    <span key={color} className="filter-tag">
                      {color}
                      <button onClick={() => removeFilter("colors", color)}>
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.sizes.map((size) => (
                    <span key={size} className="filter-tag">
                      Size: {size}
                      <button onClick={() => removeFilter("sizes", size)}>
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.materials.map((material) => (
                    <span key={material} className="filter-tag">
                      {material}
                      <button
                        onClick={() => removeFilter("materials", material)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.rating > 0 && (
                    <span className="filter-tag">
                      {filters.rating}+ Stars
                      <button onClick={() => removeFilter("rating")}>×</button>
                    </span>
                  )}
                  {filters.inStock && (
                    <span className="filter-tag">
                      In Stock
                      <button onClick={() => removeFilter("inStock")}>×</button>
                    </span>
                  )}
                  {filters.onSale && (
                    <span className="filter-tag">
                      On Sale
                      <button onClick={() => removeFilter("onSale")}>×</button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="filter-group">
              <h4>Category</h4>
              <div className="filter-options">
                {filterOptions.categories.map((category) => (
                  <label key={category} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() =>
                        handleMultiSelectFilter("categories", category)
                      }
                    />
                    <span>{category}</span>
                    <span className="count">
                      ({products.filter((p) => p.category === category).length})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-range">
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      handleFilterChange("priceRange", [
                        Number(e.target.value),
                        filters.priceRange[1],
                      ])
                    }
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      handleFilterChange("priceRange", [
                        filters.priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                  />
                </div>
                <div className="price-range-slider">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      handleFilterChange("priceRange", [
                        filters.priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                  />
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="filter-group">
              <h4>Brand</h4>
              <div className="filter-options">
                {filterOptions.brands.map((brand) => (
                  <label key={brand} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleMultiSelectFilter("brands", brand)}
                    />
                    <span>{brand}</span>
                    <span className="count">
                      ({products.filter((p) => p.brand === brand).length})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="filter-group">
              <h4>Color</h4>
              <div className="color-options">
                {filterOptions.colors.map((color) => (
                  <label key={color} className="color-option">
                    <input
                      type="checkbox"
                      checked={filters.colors.includes(color)}
                      onChange={() => handleMultiSelectFilter("colors", color)}
                    />
                    <span
                      className="color-swatch"
                      style={{ backgroundColor: color.toLowerCase() }}
                    ></span>
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="filter-group">
              <h4>Size</h4>
              <div className="size-options">
                {filterOptions.sizes.map((size) => (
                  <label key={size} className="size-option">
                    <input
                      type="checkbox"
                      checked={filters.sizes.includes(size)}
                      onChange={() => handleMultiSelectFilter("sizes", size)}
                    />
                    <span className="size-box">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="filter-group">
              <h4>Customer Rating</h4>
              <div className="rating-options">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="rating-option">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleFilterChange("rating", rating)}
                    />
                    <span>{renderStars(rating)} & Up</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="filter-group">
              <h4>Availability</h4>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) =>
                    handleFilterChange("inStock", e.target.checked)
                  }
                />
                <span>In Stock Only</span>
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.onSale}
                  onChange={(e) =>
                    handleFilterChange("onSale", e.target.checked)
                  }
                />
                <span>On Sale</span>
              </label>
            </div>
          </aside>

          {/* Main Content */}
          <main className="search-results">
            {/* Results Header */}
            <div className="results-header">
              <div className="results-info">
                <h2>{resultsCount} Products Found</h2>
                {filters.searchQuery && (
                  <p>Showing results for "{filters.searchQuery}"</p>
                )}
              </div>

              <div className="results-controls">
                <div className="sort-controls">
                  <label>Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>

                <div className="view-controls">
                  <button
                    className={`view-btn ${
                      viewMode === "grid" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    ⊞
                  </button>
                  <button
                    className={`view-btn ${
                      viewMode === "list" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    ☰
                  </button>
                </div>

                <button
                  className="filters-toggle"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filters ({getActiveFiltersCount()})
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={`products-container ${viewMode}`}>
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    {product.badge && (
                      <span className="product-badge">{product.badge}</span>
                    )}
                    {!product.inStock && (
                      <span className="out-of-stock-badge">Out of Stock</span>
                    )}

                    <div className="product-image">
                      <div className="placeholder-image">
                        <span>Product Image</span>
                      </div>
                      <div className="product-overlay">
                        <button className="quick-view-btn">Quick View</button>
                        <button className="wishlist-btn">♡</button>
                      </div>
                    </div>

                    <div className="product-info">
                      <div className="product-brand">{product.brand}</div>
                      <h4 className="product-name">{product.name}</h4>

                      <div className="product-rating">
                        {renderStars(product.rating)}
                        <span className="reviews-count">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="product-details">
                        <span className="product-color">
                          Color: {product.color}
                        </span>
                        <span className="product-material">
                          Material: {product.material}
                        </span>
                      </div>

                      <div className="product-price">
                        <span className="current-price">${product.price}</span>
                        {product.originalPrice && (
                          <span className="original-price">
                            ${product.originalPrice}
                          </span>
                        )}
                        {product.originalPrice && (
                          <span className="discount">
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            % OFF
                          </span>
                        )}
                      </div>

                      <button
                        className="add-to-cart-btn"
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button onClick={clearAllFilters} className="clear-filters-btn">
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More / Pagination */}
            {filteredProducts.length > 0 && (
              <div className="pagination">
                <button className="load-more-btn">Load More Products</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchPage;
