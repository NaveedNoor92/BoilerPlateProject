using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using Abp.Auditing;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using Abp.Runtime.Validation;
using EventCloud.Authorization.Users;
using Abp.Application.Services.Dto;

namespace EventCloud.CMS.Dto
{
    [AutoMapTo(typeof(CMS))]
    [AutoMapFrom(typeof(CMS))]
    public class CMSDto : EntityDto<int>
    {
        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string PageName { get; set; }

        public string Data { get; set; }





    }
}
