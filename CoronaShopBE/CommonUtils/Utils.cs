using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.CommonUtils
{
    public static class Utils
    {
        public static string responseGenerator<T>(bool isOK, T data_)
        {
            string data = data_ != null ? JsonConvert.SerializeObject(data_) : "null";
            string ret = $"{{\"response\":\"{isOK}\",\"data\":{data}}}";
            return ret;
        }

    }
}
