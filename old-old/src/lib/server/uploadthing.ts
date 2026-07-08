import { createUploadthing } from 'uploadthing/server';
import type { FileRouter } from 'uploadthing/server';
import { auth } from '.';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({
		image: {
			maxFileSize: '1GB',
			maxFileCount: 1,
		},
	})
		.middleware(async ({ req }) => {
			const user = await auth.api.getSession({ headers: req.headers });
			if (!user) throw new Error('Unauthorized');

			return { userId: user.user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);
			console.log('file url', file.ufsUrl);
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
