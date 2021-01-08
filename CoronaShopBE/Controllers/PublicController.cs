using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.BusinessLogic;
using CoronaShopBE.CommonUtils;
using CoronaShopBE.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoronaShopBE.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class PublicController : ControllerBase
    {
        PublicManager m_pPublicManager;
        SellersManager m_pSellersManager;

        public PublicController()
        {
            m_pPublicManager = CoronaShopService.getPublicManager();
            m_pSellersManager = CoronaShopService.getSellerManager();

        }

        [HttpGet("{shopID}")]
        public IActionResult GetShop(string shopID)
        {
            Shop shop = m_pPublicManager.GetShop(shopID);
            string response = Utils.responseGenerator<Shop>(shop != null, shop);
            return Ok(response);
        }

        [HttpPost("{shopID}")]
        public IActionResult ShopOrder(string shopID, [FromBody] Order order)
        {
            bool ret = m_pSellersManager.addNewOrder(shopID, order); 
            return Ok(Utils.responseGenerator<Object>(true, ret));
        }
    }
}