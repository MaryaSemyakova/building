using System;
using System.Net.Mail;
using System.Web.Mvc;
using System.Text;
using Building.Models;
using System.Configuration;
using System.Net;

namespace Building.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult SendRequest()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SendRequest(Request request)
        {
            return SendRequestCommon(request, "Строительная компания: заявка с сайта");            
        }

        [HttpGet]
        public ActionResult SendRequestPrice()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SendRequestPrice(Request request)
        {
            return SendRequestCommon(request, "Строительная компания: получение прайса");
        }

        private JsonResult SendRequestCommon(Request request, string header)
        {
            try
            {
                var client = new SmtpClient();
                client.Host = ConfigurationManager.AppSettings["Host"];
                client.Port = int.Parse(ConfigurationManager.AppSettings["Port"] ?? "2525");
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["MailFrom"], ConfigurationManager.AppSettings["MailPassword"]);
                client.DeliveryMethod = SmtpDeliveryMethod.Network;                
                client.Send(CreateMessage(request, header));

                return Json(data: "Данные отправлены успешно");
            }
            catch (Exception ex)
            {
                var exception = ex.Message;
                return Json(exception);
            }
        }
        private MailMessage CreateMessage(Request request, string header)
        {
            var message = new MailMessage(ConfigurationManager.AppSettings["MailAddress"], ConfigurationManager.AppSettings["MailFrom"]);
            message.Subject = header;
            message.Body = CreateBody(request).ToString();

            return message;
        }

        private StringBuilder CreateBody(Request request)
        {
            var body = new StringBuilder();
            body.AppendLine("Поступила новая заявка");
            body.AppendLine("Имя: " + request.Name ?? string.Empty);
            body.AppendLine("Почта: " + request.Email ?? string.Empty);
            body.AppendLine("Телефон: " + request.Phone ?? string.Empty);
            body.AppendLine("Сообщение: " + request.Message ?? string.Empty);
            return body;
        }
    }
}