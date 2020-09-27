using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoronaShopBE
{
    public static class Log
    {
        private static string logPath;
        private static CultureInfo culture;
        //readonly ILogger<Program> logger;
        public static void Start()
        {
            logPath = GlobalConfig.logPath;
            culture = new CultureInfo("en-GB");
        }

        public static async Task Write(string message)
        {
            StackTrace stackTrace = new StackTrace();
            var frames = stackTrace.GetFrames();
            //foreach (var frame in frames){
            var frame = stackTrace.GetFrame(3);
            var Method = frame.GetMethod();
            string MethodName = Method.Name;
            string[] FileNameArr = Method.DeclaringType.FullName.Split('.');
            string className = FileNameArr[FileNameArr.Length - 1];
            string text = String.Format("{0,2} :: {1}:{2} :: {3}",
                DateTime.Now.ToString(culture), className, MethodName ,  message);

            using (FileStream sourceStream = new FileStream(logPath,
                FileMode.Append, FileAccess.Write, FileShare.None,
                bufferSize: 4096, useAsync: true))
            {
                using (StreamWriter sw = new StreamWriter(sourceStream))
                {
                    await sw.WriteLineAsync(text);
                }
            };

               // }
            
        }
    }
}
