package com.kh.semiproject.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PlaceDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;
}
