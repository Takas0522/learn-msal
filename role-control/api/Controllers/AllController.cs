using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace api.Controllers;

public class AllData{

    public string All { get; set; }
}

[Authorize(Roles = "App.Reader,App.Writer")]
[ApiController]
[Route("[controller]")]
public class AllController : ControllerBase
{

    private readonly ILogger<ReaderController> _logger;

    public AllController(ILogger<ReaderController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<AllData> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new AllData
        {
            All = $"{index}В≥Вс"
        })
        .ToArray();
    }
}
