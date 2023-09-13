import { API_ENPOINT } from "../constants";
import Review from "../entities/Review";

export async function getAverageStars() {
    try {
        const url = new URL(<any>process.env.EXPO_PUBLIC_API_URL + API_ENPOINT.REVIEWS_AVERAGE);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        const json = await response.json();
        return json;
    } catch(err) {
        console.error(err);
    }
}

export async function getReviewsPaginated(page: number, pageSize: number) {
    try {
        const url = new URL(<any>process.env.EXPO_PUBLIC_API_URL + API_ENPOINT.REVIEWS_GET_PAGINATED);
        url.searchParams.append('page', page.toString());
        url.searchParams.append('pageSize', pageSize.toString());

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        const json = await response.json();
        return json;
    } catch(err) {
        console.error(err);
    }
}

export async function getAllReviews() {
    try {
        const url = new URL(<any>process.env.EXPO_PUBLIC_API_URL + API_ENPOINT.REVIEWS);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        const json = await response.json();
        return json;
    } catch(err) {
        console.error(err);
    }
}

export async function createReview(starsParm: number, descriptionParm: string, name: string) {
    try {
        const url = new URL(<any>process.env.EXPO_PUBLIC_API_URL + API_ENPOINT.REVIEWS);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stars: starsParm || 1,
                description: descriptionParm || "",
                name: name || "",
            })
        });

        const json = (await response.json()) as Review;
        const { createdAt, description, id, stars, user, userId } = json;
        const review = new Review(id, userId, stars, description, createdAt);
        review.setUser(user);
        return review;
    } catch(err) {
        console.error(err);
    }
}

export async function updateReview(idParam: number, starsParam: number, descriptionParam: string, name: string) {
    try {
        const url = new URL(<any>process.env.EXPO_PUBLIC_API_URL + API_ENPOINT.REVIEWS + `/${idParam}`);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stars: starsParam,
                description: descriptionParam,
                name
            })
        });

        const json = await response.json();
        const { createdAt, description, id, stars, user, userId } = json;
        const review = new Review(id, userId, stars, description, createdAt);
        review.setUser(user);
        return review;
    } catch(err) {
        console.error(err);
    }
}