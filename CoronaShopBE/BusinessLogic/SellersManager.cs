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
        public SellersManager(DatabaseAccess db)
        {
            m_pDB = db;
        }

        public bool handleNewSeller(Credentials credentials)
        {
            //TODO: check if user already exists
            using (var seller_ = new Seller(credentials))
            {

                var checkingDatabase = m_pDB.checkItemExist(seller_);
                checkingDatabase.Wait();

                if (checkingDatabase.Result)
                {
                    Log.Write($"user {credentials} already exist.");
                    return false;
                }

            }
            // user not exist can proceed creating new with that mail.
            Seller seller = new Seller(credentials);
            m_pDB.AddNewSeller(seller);
            return true;
        }

        public Seller handleSellerLoginTry(Credentials creds)
        {
            var task = m_pDB.getSellerByEmail(creds);
            task.Wait();
            Seller ret = task.Result;
            if (ret != null && ret.credentials.Equals(creds))
                return ret;
            return null;
        }


    }
}
