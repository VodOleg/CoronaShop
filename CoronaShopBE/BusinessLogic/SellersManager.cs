using CoronaShopBE.Database;
using CoronaShopBE.Database.restdb_implementation;
using CoronaShopBE.Dto;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.BusinessLogic
{
    public class SellersManager
    {
        DatabaseAccess m_pDB; 
        //private readonly ILogger m_pLogger;
        public SellersManager()
        {
            m_pDB = new DatabaseAccess();
        }

        public bool handleNewSeller(Credentials credentials)
        {
            //TODO: check if user already exists
            Seller seller = new Seller(credentials);
            m_pDB.AddNewSeller(seller);
            return true;
        }
    }
}
