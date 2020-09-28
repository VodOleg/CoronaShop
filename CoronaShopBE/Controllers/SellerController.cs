using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.BusinessLogic;
using CoronaShopBE.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace CoronaShopBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        SellersManager m_pSellersManager;
        public SellerController()
        {
            m_pSellersManager = CoronaShopService.getSellerManager();
        }


        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] Credentials creds)
        {   
            Seller authenticated = m_pSellersManager.handleSellerLoginTry(creds);
            string data = authenticated != null ? JsonConvert.SerializeObject(authenticated) : "none";
            string response = $"{{\"response\":\"{authenticated!=null}\",\"data\":{data}}}";
            return Ok(response);
        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] Credentials creds)
        {
            bool handleNewUserResult = m_pSellersManager.handleNewSeller(creds);
            string response = $"{{\"response\":\"{handleNewUserResult}\",\"data\":\"somedata\"}}";
            return Ok(response);
        }
        
    }
}