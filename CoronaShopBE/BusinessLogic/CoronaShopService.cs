using CoronaShopBE.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.BusinessLogic
{
    public static class CoronaShopService
    {
        private static DatabaseAccess m_pDatabase;
        private static SellersManager m_pSellerManager;
        private static PublicManager m_pPublicManager;
        public static bool Init()
        {
            bool success = true;

            // Init Database Layer
            m_pDatabase = new DatabaseAccess();

            // Init SellerManager Layer
            m_pSellerManager = new SellersManager(m_pDatabase);

            // Init Public Manager Layer
            m_pPublicManager = new PublicManager(m_pDatabase);

            Log.Write(" CoronaShopService initialized successfully.");
            return success;
        }

        public static DatabaseAccess getDB()
        {
            return m_pDatabase;
        }

        public static SellersManager getSellerManager()
        {
            return m_pSellerManager;
        }

        public static PublicManager getPublicManager()
        {
            return m_pPublicManager;
        }
    }
}
