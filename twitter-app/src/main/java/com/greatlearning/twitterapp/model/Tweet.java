package com.greatlearning.twitterapp.model;

import java.util.Date;
import java.util.List;

public final class Tweet  implements Comparable<Tweet>{
	
	private final long tweetId;
	
	private String tweetMsg;
	
	private final User user;
	
	private List<Media> mediaUrls;
	
	private static long tweetIdCounter = 100;
	
	private final Date createdDt = new Date();
	
	private int likes;
	
	private int comments;

	private int shares;

	private int retweets;
			
	public Tweet(User user, String tweetMsg, List<Media> mediaUrls) {
		this.tweetId= ++ tweetIdCounter;
		this.user = user;
		this.tweetMsg = tweetMsg;
		this.mediaUrls = mediaUrls;
	}
	
	public Tweet(User user, String tweetMsg) {
		this.tweetId= ++ tweetIdCounter;
		this.user = user;
		this.tweetMsg = tweetMsg;
	}
	
	public Tweet(User user, List<Media> mediaUrls) {
		this.tweetId= ++ tweetIdCounter;
		this.user = user;
		this.mediaUrls = mediaUrls;
	}
	
	public String getTweetMsg() {
		return tweetMsg;
	}

	public void setTweetMsg(String tweetMsg) {
		this.tweetMsg = tweetMsg;
	}

	public List<Media> getMediaUrls() {
		return mediaUrls;
	}

	public void setMediaUrls(List<Media> mediaUrls) {
		this.mediaUrls = mediaUrls;
	}

	public static long getTweetIdCounter() {
		return tweetIdCounter;
	}

	public static void setTweetIdCounter(long tweetIdCounter) {
		Tweet.tweetIdCounter = tweetIdCounter;
	}
	
	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public int getComments() {
		return comments;
	}

	public void setComments(int comments) {
		this.comments = comments;
	}

	public int getShares() {
		return shares;
	}

	public void setShares(int shares) {
		this.shares = shares;
	}

	public int getRetweets() {
		return retweets;
	}

	public void setRetweets(int retweets) {
		this.retweets = retweets;
	}

	public Date getCreatedDt() {
		return createdDt;
	}

	public long getTweetId() {
		return tweetId;
	}

	public User getUser() {
		return user;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((createdDt == null) ? 0 : createdDt.hashCode());
		result = prime * result + (int) (tweetId ^ (tweetId >>> 32));
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Tweet other = (Tweet) obj;
		if (createdDt == null) {
			if (other.createdDt != null)
				return false;
		} else if (!createdDt.equals(other.createdDt))
			return false;
		if (tweetId != other.tweetId)
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}
	
	@Override
	public int compareTo(Tweet tweet) {
		return (int)(this.getCreatedDt() tweet.getCreatedDt());
	}

	@Override
	public String toString() {
		return "Tweet "+ tweetId +": tweetMsg : " + tweetMsg + "\n"; //+ ", mediaUrls= " +mediaUrls
				//+ ", createdDt=" + createdDt + "]";
	}

	enum MediaType{
		IMAGE,
		AUDIO,
		VIDEO;
	}
	
	/*
		
		Media is related with only Tweet so it has been written inside the Tweet class. Called AGGREGATION.
		If tweet is deleted, media will also be deleted => Stronger form of aggregation.
		lifecycle of media depend on the lifecycle of the outer class.
		
	*/
	
	class Media{
		private MediaType mediaType;
		private String url;
		
		public Media(MediaType mediaType, String url) {
			this.mediaType = mediaType;
			this.url = url;
		}
		
	}
	
}
