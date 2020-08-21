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
    [AutoMapFrom(typeof(CMS))]
    class CMSPageEditorDto
    {

        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string Index { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string PageName { get; set; }

        public string Data { get; set; }
    }
}
