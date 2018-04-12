# Angular Starter Kit App Tools

#### Check Copyright

It will validate that all of the files that should contain a copyright statement and a watermark in their headers in fact do so.

You can run it like so:
<pre>
npm run tools.check-copyright
</pre>

It also runs before the build tasks, and will cause them to fail if there is at least one file that is not valid.

If any files to not, and error message will be shown, indicating which files don't have the copyright statement and/or watermark in the right format, as well as instructions on how to update those files to make sure they are valid going forward.

For reference, the following are the copyright statements that should be used.

For TS/JS/SCSS files:
<pre>
/*
 * Copyright (c) 2018 Company Name.
 * All rights reserved.
 *
 * Company Name and the Company Name logo are trademarks
 * or registered trademarks of Company Name
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * WATERMARK
 */
</pre>

For HTML files:
<pre>
&lt;!--
 * Copyright (c) 2018 Company Name.
 * All rights reserved.
 *
 * Company Name and the Company Name logo are trademarks
 * or registered trademarks of Company Name
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * WATERMARK
--&gt;
</pre>

<!-- If you'd like to copy the HTML one, copy the following instead:-->

<!--
 * Copyright (c) 2018 Company Name.
 * All rights reserved.
 *
 * Company Name and the Company Name logo are trademarks
 * or registered trademarks of Company Name
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * WATERMARK
-->

#### Auto Translate

It will automatically translate the "en-US" string table into the italian ("it") language using Google Translate, and write it to a (new) file in the same directory.

You can run it like so:
<pre>
npm run tools.auto-translate
</pre>

It will only translate new items (which are present in the "en-US" table but not the "it" table).
It will also delete entries from the "it" table that are not present in the "en-US" table.

Text within curly brackets (<code>{ }</code>) or less than and greater than symbols (<code>< ></code>) will be ignored, and just copied over. It can be manually translated after running the script, however.

If the following error is shown, it means that you have a left bracket or less than symbol without a respective right bracket or greater than symbol. 
<pre>
ERROR: Failed to find groups for string: [string]
</pre>

Since it might be intended, you will have to either fix it or copy over and translate these entries manually. 