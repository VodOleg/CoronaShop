using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.Dto
{
    public class Credentials
    {
            [JsonProperty("email")]
            public string email { get; set; }

            [JsonProperty("pw")]
            public string pw { get; set; }


        
    }

    
}
