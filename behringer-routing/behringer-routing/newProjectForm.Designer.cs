namespace behringer_routing
{
    partial class newProjectForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnOK = new System.Windows.Forms.Button();
            this.tbxName = new System.Windows.Forms.TextBox();
            this.cbxConsole = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.tbxLocation = new System.Windows.Forms.TextBox();
            this.btnBrowse = new System.Windows.Forms.Button();
            this.btnCancel = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btnOK
            // 
            this.btnOK.Location = new System.Drawing.Point(167, 251);
            this.btnOK.Name = "btnOK";
            this.btnOK.Size = new System.Drawing.Size(120, 23);
            this.btnOK.TabIndex = 0;
            this.btnOK.Text = "OK";
            this.btnOK.UseVisualStyleBackColor = true;
            this.btnOK.Click += new System.EventHandler(this.btnOK_Click);
            // 
            // tbxName
            // 
            this.tbxName.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.tbxName.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.tbxName.Location = new System.Drawing.Point(53, 94);
            this.tbxName.Name = "tbxName";
            this.tbxName.Size = new System.Drawing.Size(234, 20);
            this.tbxName.TabIndex = 1;
            // 
            // cbxConsole
            // 
            this.cbxConsole.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.cbxConsole.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.cbxConsole.FormattingEnabled = true;
            this.cbxConsole.Location = new System.Drawing.Point(66, 120);
            this.cbxConsole.MaxDropDownItems = 10;
            this.cbxConsole.Name = "cbxConsole";
            this.cbxConsole.Size = new System.Drawing.Size(221, 21);
            this.cbxConsole.Sorted = true;
            this.cbxConsole.TabIndex = 2;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.label1.Location = new System.Drawing.Point(9, 97);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(38, 13);
            this.label1.TabIndex = 3;
            this.label1.Text = "Name:";
            // 
            // label2
            // 
            this.label2.Font = new System.Drawing.Font("Arial", 24.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.label2.Location = new System.Drawing.Point(12, 9);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(275, 61);
            this.label2.TabIndex = 4;
            this.label2.Text = "NEW PROJECT";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.label3.Location = new System.Drawing.Point(9, 123);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(51, 13);
            this.label3.TabIndex = 5;
            this.label3.Text = "Console :";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.label4.Location = new System.Drawing.Point(9, 168);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(51, 13);
            this.label4.TabIndex = 6;
            this.label4.Text = "Location:";
            // 
            // tbxLocation
            // 
            this.tbxLocation.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.tbxLocation.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.tbxLocation.Location = new System.Drawing.Point(12, 192);
            this.tbxLocation.Name = "tbxLocation";
            this.tbxLocation.Size = new System.Drawing.Size(275, 20);
            this.tbxLocation.TabIndex = 7;
            // 
            // btnBrowse
            // 
            this.btnBrowse.Location = new System.Drawing.Point(212, 163);
            this.btnBrowse.Name = "btnBrowse";
            this.btnBrowse.Size = new System.Drawing.Size(75, 23);
            this.btnBrowse.TabIndex = 8;
            this.btnBrowse.Text = "Browse";
            this.btnBrowse.UseVisualStyleBackColor = true;
            this.btnBrowse.Click += new System.EventHandler(this.btnBrowse_Click);
            // 
            // btnCancel
            // 
            this.btnCancel.Location = new System.Drawing.Point(12, 251);
            this.btnCancel.Name = "btnCancel";
            this.btnCancel.Size = new System.Drawing.Size(120, 23);
            this.btnCancel.TabIndex = 9;
            this.btnCancel.Text = "Cancel";
            this.btnCancel.UseVisualStyleBackColor = true;
            this.btnCancel.Click += new System.EventHandler(this.btnCancel_Click);
            // 
            // newProjectForm
            // 
            this.AcceptButton = this.btnOK;
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.CancelButton = this.btnCancel;
            this.ClientSize = new System.Drawing.Size(300, 290);
            this.Controls.Add(this.btnCancel);
            this.Controls.Add(this.btnBrowse);
            this.Controls.Add(this.tbxLocation);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.cbxConsole);
            this.Controls.Add(this.tbxName);
            this.Controls.Add(this.btnOK);
            this.MaximumSize = new System.Drawing.Size(316, 329);
            this.MinimumSize = new System.Drawing.Size(316, 329);
            this.Name = "newProjectForm";
            this.Text = "New Project";
            this.Load += new System.EventHandler(this.newProjectForm_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnOK;
        private System.Windows.Forms.TextBox tbxName;
        private System.Windows.Forms.ComboBox cbxConsole;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox tbxLocation;
        private System.Windows.Forms.Button btnBrowse;
        private System.Windows.Forms.Button btnCancel;
    }
}