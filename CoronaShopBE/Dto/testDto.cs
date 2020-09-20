using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.Dto
{
    public partial class testDto
    {
        [JsonProperty("JobId")]
        public string JobId { get; set; }

    }
}
