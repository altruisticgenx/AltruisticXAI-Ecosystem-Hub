# 🚀 Deployment Checklist

After pushing these changes, complete these steps to enable GitHub Pages deployment:

## Step 1: Enable GitHub Pages
- [ ] Go to: **Repo → Settings → Pages**
- [ ] Under **Source**, select: **GitHub Actions**
- [ ] Click **Save**

## Step 2: Set Workflow Permissions
- [ ] Go to: **Repo → Settings → Actions → General**
- [ ] Scroll to **Workflow permissions**
- [ ] Select: **Read and write permissions**
- [ ] Check: **Allow GitHub Actions to create and approve pull requests**
- [ ] Click **Save**

## Step 3: Deploy
- [ ] Push to `main` branch (or manually trigger workflow)
- [ ] Go to **Actions** tab
- [ ] Watch workflow complete (build + deploy jobs)
- [ ] Check deployment URL in workflow output

## Step 4: Verify
- [ ] Visit `https://username.github.io/repo-name/`
- [ ] Test navigation between pages
- [ ] Verify assets load correctly
- [ ] Check browser console for errors

---

## Need Help?

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed troubleshooting.
