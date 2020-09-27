using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.Dto;
using System.Web;
using Newtonsoft.Json;
using System.Net.Http;
namespace CoronaShopBE.Database.restdb_implementation
{
    public class restDB : DatabaseInterface
    {
        private string m_sUrl;
        private string m_sKey;
        public restDB(string url, string key)
        {
            m_sUrl = url;
            m_sKey = key;
        }
        public bool AddNewSeller(Seller seller)
        {
            Console.WriteLine(seller.ToString());

            //var client = new RestClient("https://coronashop-6a6d.restdb.io/rest/users");
            //var request = new RestRequest(Method.POST);
            //request.AddHeader("cache-control", "no-cache");
            //request.AddHeader("x-apikey", m_sKey);
            //request.AddHeader("content-type", "application/json");
            //request.AddParameter("application/json", "{\"field1\":\"xyz\",\"field2\":\"abc\"}", ParameterType.RequestBody);
            //IRestResponse response = client.Execute(request);
            return true;
        }
    }
}
