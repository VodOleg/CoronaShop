using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoronaShopBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        [HttpPost]
        [Route("Login")]
        public IActionResult test([FromBody] Credentials creds)
        {

            bool ret = (creds.email == "oleg@email.com" && creds.pw == "1234");
            
            string response = $"{{\"response\":\"{ret}\",\"data\":\"somedata\"}}";
            return Ok(response);
        }
    }
}