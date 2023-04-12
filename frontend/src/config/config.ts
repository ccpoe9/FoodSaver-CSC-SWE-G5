export class Config{

    static readonly APIROOT = "http://localhost:3000/api";

    static readonly APIURLS = {
        PRODUCTS : "/products",
        PRODUCTTYPES : "/products/type",
        PRODUCTDETAILS : "/products/details",
        PRODUCTSEARCH : "/products/search",
        STORES : "/stores",
        FAVORITES : "/favorites",
        REPORTS : "/reports",
        MYSTORES : "/stores/admin",
        ADMINREPORTS : "/reports/admin",
        CUSTOMERSIGNUP : "/users/customers/signup",
        CUSTOMERLOGIN : "/users/customers/login",
        SUPPLIERLOGIN : "/users/admin/login"
    }
}