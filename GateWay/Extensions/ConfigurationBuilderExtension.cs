using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Ocelot.Configuration.File;
using System.IO;
using System.Linq;

namespace GateWay.Extensions
{
    public static class ConfigurationBuilderExtension
    {
        public static IConfigurationBuilder AddOcelotconfigFiles(this IConfigurationBuilder builder, string folder, string[] appNames, IHostEnvironment env) 
        {
            const string primaryConfigFile = "ocelot.json";

            const string globalConfigFile = "ocelot.global.json";

            var files = new DirectoryInfo(folder)
                .EnumerateFiles()
                .Where(fi => fi.Name.Contains($"ocelot.{env.EnvironmentName}.json") && appNames.Any(e => fi.Name.Contains(e)))
                .ToList();

            var fileConfiguration = new FileConfiguration();

            foreach (var file in files)
            {
                if (files.Count > 1 && file.Name.Equals(primaryConfigFile, System.StringComparison.OrdinalIgnoreCase)) 
                {
                    continue;
                }

                var lines = File.ReadAllText(file.FullName);
                var config = JsonConvert.DeserializeObject<FileConfiguration>(lines);
                if (file.Name.Equals(globalConfigFile, System.StringComparison.OrdinalIgnoreCase)) 
                {
                    fileConfiguration.GlobalConfiguration = config.GlobalConfiguration;
                }

                fileConfiguration.Aggregates.AddRange(config.Aggregates);
                fileConfiguration.ReRoutes.AddRange(config.ReRoutes);
            }
            var json = JsonConvert.SerializeObject(fileConfiguration);
            File.WriteAllText(primaryConfigFile, json);
            builder.AddJsonFile(primaryConfigFile, false, false);

            return builder;
        }
    }
}
