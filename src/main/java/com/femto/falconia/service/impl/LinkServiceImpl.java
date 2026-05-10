package com.femto.falconia.service.impl;

import com.femto.falconia.domain.model.AddLinkRequest;
import com.femto.falconia.domain.entity.Link;
import com.femto.falconia.repository.LinkRepository;
import com.femto.falconia.service.LinkService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LinkServiceImpl implements LinkService {

    private final LinkRepository linkRepository;

    public LinkServiceImpl(LinkRepository linkRepository){
        this.linkRepository = linkRepository;
    }

    @Override
    public Link addLink(AddLinkRequest request) {

        Link link = new Link(
                null,
                request.linkName(),
                request.url(),
                request.userId());


        return linkRepository.save(link);
    }

    @Override
    public List<Link> getLinksByUser(UUID userId){

        return linkRepository.getLinksByUserId(userId);
    }
}
