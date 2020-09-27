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
    }
}
