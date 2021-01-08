using CoronaShopBE.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.Database
{
    interface DatabaseInterface
    {
        /// <summary>
        /// This function should receive a seller entity and add it to the database
        /// </summary>
        /// <param name="seller"></param>
        /// <returns>true if succeed</returns>
        Task AddNewSeller(Seller seller);
        Task<bool> checkItemExist(Seller seller);

        Task<Seller> getSellerByEmail(Credentials credentials);

        Shop getShop(string shopId);
        Seller getSellerFromShop(string shopId);

        bool AddNewShop(Seller seller);
        bool DeleteShop(string shopID, Seller shopOwner);

        bool UpdateShop(string shopID, Seller shopOwner);
        bool addOrderToSeller(Seller shopOwner, Order order);
        bool removeOrderFromSeller(Seller shopOwner, Order order);
    }
}
