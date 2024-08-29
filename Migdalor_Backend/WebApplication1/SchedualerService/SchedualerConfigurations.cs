using Quartz;
using Quartz.Impl;
using System.Collections.Specialized;

namespace WebApplication1.SchedualerService
{
    public class SchedualerConfigurations
    {
       public static IScheduler ConfigureSchedualer()
        {
            NameValueCollection props = new NameValueCollection
            {
                {"quartz.serializer.type","binary" }
            };
            StdSchedulerFactory factory = new StdSchedulerFactory(props);

            var schedualer = factory.GetScheduler().Result;
            schedualer.Start().Wait();
            return schedualer;

        }
      
    }
}
