using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.Dto
{
    public class test
    {
        [JsonProperty("test")]
        public testDto testdto { get; set; }
        
    }
}
