package com.femto.falconia.service.impl;

import com.femto.falconia.domain.entity.Link;
import com.femto.falconia.domain.entity.User;
import com.femto.falconia.domain.model.PublicProfile;
import com.femto.falconia.repository.LinkRepository;
import com.femto.falconia.repository.UserRepository;
import com.femto.falconia.service.PublicProfileService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicProfileServiceImpl implements PublicProfileService {

    private final UserRepository userRepository;
    private final LinkRepository linkRepository;

    public PublicProfileServiceImpl(UserRepository userRepository, LinkRepository linkRepository) {
        this.userRepository = userRepository;
        this.linkRepository = linkRepository;
    }

    @Override
    public PublicProfile getPublicProfile(String username) {

        User foundUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("No such username found"));

        List<Link> userLinks = linkRepository.getLinksByUserId(foundUser.getId());

        return new PublicProfile(
                foundUser.getId(),
                foundUser.getDisplayUsername(),
                foundUser.getFirstName(),
                foundUser.getLastName(),
                userLinks
        );
    }
}
