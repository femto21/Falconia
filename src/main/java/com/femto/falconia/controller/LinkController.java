package com.femto.falconia.controller;

import com.femto.falconia.domain.dto.AddLinkRequestDto;
import com.femto.falconia.domain.dto.LinkDto;
import com.femto.falconia.domain.model.AddLinkRequest;
import com.femto.falconia.domain.entity.Link;
import com.femto.falconia.domain.entity.User;
import com.femto.falconia.mapper.LinkMapper;
import com.femto.falconia.service.LinkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/links")
public class LinkController {

    private final LinkService linkService;

    private final LinkMapper linkMapper;

    public LinkController(LinkService linkService, LinkMapper linkMapper){
        this.linkService = linkService;
        this.linkMapper = linkMapper;
    }

    @PostMapping
    public ResponseEntity<LinkDto> addLink(Authentication authentication, @RequestBody AddLinkRequestDto dto) {
        User user = (User) authentication.getPrincipal();
        assert user != null;
        AddLinkRequest request = linkMapper.fromAddLinkDto(user.getId(), dto);

        Link createdLink = linkService.addLink(request);

        LinkDto linkDto = linkMapper.toLinkDto(createdLink);

        return new ResponseEntity<>(linkDto,HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LinkDto>> getLinks(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        assert user != null;

        List<Link> userLinks = linkService.getLinksByUser(user.getId());

        List<LinkDto> linksDto = userLinks.stream().map(link -> linkMapper.toLinkDto(link)).toList();

        return new ResponseEntity<>(linksDto, HttpStatus.OK);
    }
}
