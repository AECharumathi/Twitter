package com.greatlearning.twitterapp.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public final class User implements Comparable<User> {
	
	private final String userHandle;
	
	private final long userId;
	
	private String firstName;
	
	private String lastName;
	
	private String password;
	
	private final String emailAddress;
	
	private String profilePic;
	
	private String coverImage;
	
	private String location;
	
	private String websiteUrl;
	
	private final Set<User> followers = new HashSet<User>();
	
	private final Set<User> followings = new HashSet<User>();
		
	private final Date createdDt = new Date();
	
	private Date updatedDt = new Date();
	
	private static long userIdCounter = 1001;
	
	private final Set<Tweet> tweets= new HashSet<Tweet>();
	
	public User(String userHandle, String emailAddress, String firstName, String lastName, String password) {
		this.userId= ++userIdCounter;
		this.userHandle=userHandle;
		this.emailAddress=emailAddress;
		this.firstName=firstName;
		this.lastName=lastName;
		this.password=password;
	}
	
	public User(String userHandle, String emailAddress, String firstName, String lastName, String password,String coverImage, String profilePic) {
		this.userId= ++userIdCounter;
		this.userHandle=userHandle;
		this.emailAddress=emailAddress;
		this.firstName=firstName;
		this.lastName=lastName;
		this.password=password;
		this.coverImage=coverImage;
		this.profilePic=profilePic;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	public String getCoverImage() {
		return coverImage;
	}

	public void setCoverImage(String coverImage) {
		this.coverImage = coverImage;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getWebsiteUrl() {
		return websiteUrl;
	}

	public void setWebsiteUrl(String websiteUrl) {
		this.websiteUrl = websiteUrl;
	}

	public Set<User> getFollowers() {
		return followers;
	}

	public void addFollowers(User followers) {
		this.followers.add(followers);
		followers.addFollowings(this);
	}
	
	public void removeFollowers(User followers) {
		this.followers.remove(followers);
		followers.removeFollowings(this);
	}
	
	public Set<User> getFollowings() {
		return followings;
	}

	public void addFollowings(User followings) {
		this.followings.add(followings);
		followings.addFollowers(this);
	}
	
	public void removeFollowings(User followings) {
		this.followings.remove(followings);
		followings.removeFollowers(this);
	}
	
	public Date getUpdatedDt() {
		return updatedDt;
	}

	public void setUpdatedDt(Date updatedDt) {
		this.updatedDt = updatedDt;
	}

	public long getUserIdCounter() {
		return userIdCounter;
	}

	public void setUserIdCounter(long userIdCounter) {
		this.userIdCounter = userIdCounter;
	}

	public String getUserHandle() {
		return userHandle;
	}

	public long getUserId() {
		return userId;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public Date getCreatedDt() {
		return createdDt;
	}
	
	public void addTweet(Tweet tweet) {
		this.tweets.add(tweet);
	}
	
	public void deleteTweet(Tweet tweet) {
		this.tweets.remove(tweet);
	}
	
	public Set<Tweet> getTweets() {
		return tweets;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((emailAddress == null) ? 0 : emailAddress.hashCode());
		result = prime * result + ((userHandle == null) ? 0 : userHandle.hashCode());
		result = prime * result + (int) (userId ^ (userId >>> 32));
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
		User other = (User) obj;
		if (emailAddress == null) {
			if (other.emailAddress != null)
				return false;
		} else if (!emailAddress.equals(other.emailAddress))
			return false;
		if (userHandle == null) {
			if (other.userHandle != null)
				return false;
		} else if (!userHandle.equals(other.userHandle))
			return false;
		if (userId != other.userId)
			return false;
		return true;
	}

	
	@Override
	public String toString() {
		return "User [userHandle=" + userHandle + ", userId=" + userId + ", firstName=" + firstName + ", lastName="
				+ lastName + ", emailAddress=" + emailAddress + ", location=" + location + ", websiteUrl=" + websiteUrl
				+ "]";
	}

	public int compareTo(User user) {
		// TODO Auto-generated method stub
		return (int)(this.userId - user.userId);
	}
	
}
