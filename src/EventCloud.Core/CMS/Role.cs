using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Authorization.Roles;
using Abp.Domain.Entities;
using EventCloud.CMS;

namespace EventCloud.CMS
{
    [Table("CmsPages")]
    public class CMS : Entity<int>
    {
        public string PageName { get; set; }
        public string Data { get; set; }

    }
}
