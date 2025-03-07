package com.kh.semiproject.service;

import java.util.random.RandomGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.semiproject.dao.CertDao;
import com.kh.semiproject.dto.CertDto;

@Service
public class CertService {

	@Autowired
	private RandomGenerator randomGenerator;
	@Autowired
	private CertDao certDao;
	
}
