using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using Abp.Auditing;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using Abp.Runtime.Validation;
using EventCloud.Authorization.Users;

namespace EventCloud.CMS.Dto
{
    //[AutoMapTo(typeof(CMS))]
    class GetCMSDto
    {
        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string PageName { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string Data { get; set; }
    }
}

