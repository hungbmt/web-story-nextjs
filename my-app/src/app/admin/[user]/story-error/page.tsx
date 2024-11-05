// @flow
import * as React from 'react';
import AdminLayout from "@/app/layout/adminLayout/adminLayout";
import StoryErrorPage from "@/app/admin/[user]/story-error/storyErrorPage";
 const StoryError = () => {
    return (
        <AdminLayout>
          <StoryErrorPage/>
        </AdminLayout>
    );
};

 export default StoryError