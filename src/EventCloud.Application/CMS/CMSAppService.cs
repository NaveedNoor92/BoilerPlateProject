using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using EventCloud.Authorization;
using EventCloud.CMS.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EventCloud.CMS
{
    public class CMSAppService : AsyncCrudAppService<CMS, CMSDto>, ICMSAppService
    {
        public CMSAppService(IRepository<CMS> repository) : base(repository)
        {
        }

        public Task<CMSDto> GetCMSContent(EntityDto<int> PageId)
        {
            var test = base.Get(PageId);
            return base.Get(PageId);
        }

        public Task<CMSDto> InsertOrUpdateCMSContent(CMSDto Page)
        {
            if (Page.Id == 0)
            {
                return base.Create(Page);
            }
            else
            {
                return base.Update(Page);
            }
        }

        public override async Task<PagedResultDto<CMSDto>> GetAll(PagedAndSortedResultRequestDto input)
        {
            var result = await base.GetAll(input);
            return result;
        }

    }
}