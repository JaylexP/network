export const checkAuthentication = async () => {
    try {
        const response = await fetch('/api/check-authentication/');
        const data = await response.json();
        return data.authenticated;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
};

export const FetchNewPost = async (content) => {
    try {
        const response = await fetch('/api/posts/new', {
            method: "POST", body: JSON.stringify({
                content
            })
        });
        if (!response.ok) {
            throw new Error("Error");
        }

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error)
    }

}

export const FetchAllPosts = async (page = 1) => {
    try {
        const response = await fetch(`/api/posts?page=${page}`);
        
        if (!response.ok) {
            throw new Error("Error");
        }

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error)
    }

}

export const FetchFollowingPosts = async (page = 1) => {
    try {
        const response = await fetch(`/api/posts/following?page=${page}`);
        
        if (!response.ok) {
            throw new Error("Error");
        }

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error)
    }

}

export const FetchUserPosts = async (username, page = 1) => {
    try {
        const response = await fetch(`/api/posts/${username}?page=${page}`, {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("Error");
        }

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }

        const data = await response.json();
        return data
    } catch (error) {
        throw new Error(error)
    }
  
}

export const FetchUserProfile = async (username) => {
    
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
        window.location.href = 'login';
        return;
    }
    
    try {
        const response = await fetch(`/api/profile/${username}`);
        
        if (!response.ok) {
            throw new Error("Error");
        }

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }

        const data = await response.json();
        return data
    } catch (error) {
        throw new Error(error)
    }
   
}

export const FetchUserLikes = async (post_id) => {
    try {
        const response = await fetch(`/api/posts/${post_id}/like`, {
            method: "POST"
        });
        
        if (!response.ok) {
            throw new Error("Error");
        }

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }
        const data = await response.json();
        return data
    } catch (error) {
        throw new Error(error)
    }
  
}
export const FetchUserPostEdit = async (post_id) => {
    try {
        const response = await fetch(`/api/posts/${post_id}/edit`, {
            method: "POST"
        });
        
        if (!response.ok) {
            throw new Error("Error");
        }

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }
        const data = await response.json();
        return data
    } catch (error) {
        throw new Error(error)
    }
   
}

export const FetchUserFollow = async (username) => {
    try {
        const response = await fetch(`/api/profile/${username}/follow`, {
            method: "POST"
        });
        
        if (!response.ok) {
            throw new Error("Error");
        }

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }
        const data = await response.json();
        return data
    } catch (error) {
        throw new Error(error)
    }
   
}
