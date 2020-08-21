using Abp.Application.Services;
using Abp.Application.Services.Dto;
using EventCloud.CMS.Dto;
using System.Threading.Tasks;

namespace EventCloud.CMS
{
    public interface ICMSAppService : IAsyncCrudAppService<CMSDto>
    {
        Task<CMSDto> GetCMSContent(EntityDto<int> PageId);
    }
}