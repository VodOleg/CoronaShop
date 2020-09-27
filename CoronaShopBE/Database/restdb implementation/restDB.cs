using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.Dto;

namespace CoronaShopBE.Database.restdb_implementation
{
    public class restDB : DatabaseInterface
    {
        public bool AddNewSeller(Seller seller)
        {
            Console.WriteLine(seller.ToString());
            //var client = new RestClient("https://coronashop-6a6d.restdb.io/rest/users");
            //var request = new RestRequest(Method.POST);
            //request.AddHeader("cache-control", "no-cache");
            //request.AddHeader("x-apikey", "429ec86b762e23ed6c41a0328b1b7e10d4889");
            //request.AddHeader("content-type", "application/json");
            //request.AddParameter("application/json", "{\"field1\":\"xyz\",\"field2\":\"abc\"}", ParameterType.RequestBody);
            //IRestResponse response = client.Execute(request);
            return true;
        }
    }
}
